setTimeout(() => {
    throw new Error('ops')
}, 300)

process.on('uncaughtException',()=> {
    
})
process.on('unhandledRejection',()=> {
        
})