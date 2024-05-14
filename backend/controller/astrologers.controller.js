const { astroModel } = require("../model/astrologers.model")



const handleCreateAstro= async (req, res) => {
 
   const data = req.body
   
   try {
      const astro = new astroModel(data)
      await astro.save()
      res.status(200).json({ msg: "astrologers register Successfully!!!", state:true })
   } catch (error) {
      res.status(400).json({ msg: error.message })
   }
}

const handleGetAstro = async (req, res) => {
   try {
      const astro = await astroModel.find()
      res.status(200).send(astro)
   } catch (error) {
      res.status(400).send({ msg: error.msg })
   }
}

const handleUpadteAstro = async (req, res) => {
   const { astroId } = req.params
  console.log(astroId)
   try {
      await astroModel.findByIdAndUpdate({ _id: astroId }, req.body)
      res.json({ msg: `astrologers has been updated` })

   } catch (error) {
      console.log(error);
   }

}

const handleDeleteAstro = async (req, res) => {
  
   const { astroId } = req.params

   try {
      await astroModel.findByIdAndDelete({ _id: astroId }, req.body)
      res.status(200).json({ msg: `astro has been deleted successfully`, state:true })
   } catch (error) {
      console.log(error);
   }
}

module.exports = {
    handleCreateAstro,handleGetAstro,handleUpadteAstro,handleDeleteAstro
}