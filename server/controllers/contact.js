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

export const getMessages = async (req, res) =>{
    try{
        const messages = await Contact.find();
        return res.status(200).json({
            success: true,
            messages
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        })
    }
}

export const deleteMessage = async (req, res) =>{
    const id = req.params.id;
    try{
        const message = await Contact.findByIdAndDelete(id);
        if(!message){
            return res.status(404).json({
                success: false,
                message: "Message not found."
            })
        }
        return res.status(200).json({
            success: true,
            message: "Message deleted successfully."
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        })
    }
}

export const markAsUnread = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await Contact.findByIdAndUpdate(id, { read: false });
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message marked as read."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        });
    }
};
export const markAsRead = async (req, res) => {
    const id = req.params.id;
    try {
        const message = await Contact.findByIdAndUpdate(id, { read: true });
        if (!message) {
            return res.status(404).json({
                success: false,
                message: "Message not found."
            });
        }
        return res.status(200).json({
            success: true,
            message: "Message marked as read."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        });
    }
};

export const getMessagesById = async (req, res) =>{
    const id = req.params.id;
    try{
        const message = await Contact.findById(id);
        if(!message){
            return res.status(404).json({
                success: false,
                message: "Message not found."
            })
        }
        return res.status(200).json({
            success: true,
            message
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            error,
            message: "Something went wrong."
        })
    }
}