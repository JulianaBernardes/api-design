import prisma from "../db"

// get all
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    // REST issue: generic routes
    // The schema does not accurately reflect our requirements
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]       
    }, [])

    res.json({ data: updates })

}
// get one
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({ data: update });
}

// create
export const createUpdate = async (req, res) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if(!product) {
        res.status(404).json({ error: "Product not found to this update" });
        return;
    }

    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: {id: product.id} }
        }
    })

    res.json({ data: update });
}

// update
export const updateUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
      where: {
        belongsToId: req.user.id,
      },
      include: {
        updates: true
      }
    })
  
    const updates = products.reduce((allUpdates, product) => {
      return [...allUpdates, ...product.updates]
    }, [])
  
    const match = updates.find(update => update.id === req.params.id)
  
    if (!match) {
      // handle this
      return res.json({message: 'nope'})
    }
  
  
    const updatedUpdate = await prisma.update.update({
      where: {
        id: req.params.id
      },
      data: req.body
    })
  
    res.json({data: updatedUpdate})
  }

// delete
export const deleteUpdate = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]       
    }, [])

    const match = updates.find(update => update.id === req.params.id)

    if(!match) {
        res.status(404).json({ error: "Update not found" });
        return;
    }
    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })
    res.json({ data: deleted });
}




