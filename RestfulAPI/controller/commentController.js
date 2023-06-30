const commentModel = require('../model/commentModel.js')
const { commentCreateValidate, commentUpdateValidate } = require('../middleware/validate.js')
class commentController {
    createComment = (req, res) => {
        const { error, value } = commentCreateValidate(req.body)
        if (error) return res.statuss(400).send(error.details[0].message)
        const newComment = new commentModel(value)
        // newComment.content = req.body.content
        // try {
        //     const comment = newComment.save()
        //     res.send(comment)
        // } catch (e) {
        //     console.log('has error');
        //     res.status(400).send(e)
        // }
        newComment.save((err, newComment) => {
            if (err) { res.send('err luu thong tin cooment') }
            else { res.send(newComment) }
        })
    }
    getAllComments = (req, res) => {
        commentModel.find()
            .populate("userID")
            .populate("newsID")
            .exec((error, comment) => {
                if (error) { res.send('khong the lay comment') }
                else {
                    console.log('lay comment thanh cong');
                    console.log(comment);
                    res.send(comment)
                }
            })
    }
    getAllCommentsByNewsId = (req, res) => {
        commentModel.find({ newsID:req.params.id })
            .populate("userID")
           
            .exec((error, comment) => {
                if (error) { res.send('khong the lay comment') }
                else {
                    console.log('lay comment của 1 bài viet thanh cong');
                    console.log(comment);
                    res.send(comment)
                }
            })
    }
    getCommentById = (req, res) => {
        commentModel.find({ _id: req.params.id })
            .populate("userID")
            .populate("newsID")
            .exec((err, comment) => {
                if (err) { res.send('khong the lay comment') }
                else {
                    console.log('lay comment thanh cong');
                    console.log(comment);
                    res.send(comment)
                }
            })
    }

    updateCommentById = (req, res) => {
        const { err, value } = commentUpdateValidate(req.body)
        if (err) return res.status(400).send(err.details[0].message);

        commentModel.findByIdAndUpdate({ _id: req.params.id },
            value,
            { upsert: true }
        )
            .exec((error) => {
                if (error) {
                    res.send('error pdate')
                } else {
                    console.log('update success');
                    res.send('update success')
                }
            })
    }
    deleteCommentById = (req, res) => {
        commentModel.findByIdAndDelete({ _id: req.params.id }, (err) => {
            if (err) { res.send('error delte') }
            else { res.send('delete success') }
        })
    }

}
module.exports = new commentController()