import Contact from '../models/contact.js'

export const postMessage = async (req, res) =>{
    const data = req.body;
    try{
        const contactData = await Contact.create(data);
        console.log(contactData);

        return res.status(200).json({
            success: true,
            message: "Message Sent successfully."
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        })
    }
}