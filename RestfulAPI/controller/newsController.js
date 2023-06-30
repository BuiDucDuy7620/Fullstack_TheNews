const newsModel = require('../model/newsModel.js')
const { newsCreateValidate, newsUpdateValidate } = require('../middleware/validate.js')

class newsController {
    createNews = (req, res) => {
        const { error, value } = newsCreateValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        const newNews = new newsModel(value)
        // newNews.title=req.body.title
        // newNews.description=req.body.description
        // newNews.content=req.body.content
        // newNews.image=req.body.image

        // try{
        //     const news= newNews.save()
        //     res.send(news)
        // }catch(e){
        //     console.log('has error')
        //     res.status(400).send(e)
        // }
        newNews.save((err, newNews) => {
            if (err) {
                res.send("Error luu thong tin newNews");
            } else {
                console.log("Luu thong tin newNews thanh cong", newNews);
                res.send(newNews);
            }
        });
    };

    getAllNews = (req, res) => {
        newsModel.find()
        .exec((error, news) => {
            if (error) {
                res.send('khong the lay thong tin news')
            } else {
                console.log('lay thanh cong  bai bao')
                res.send(news)
                console.log(news)
            }
        })
    }
    getNewsById = (req, res) => {
        newsModel.find({ _id: req.params.id })
            .populate("userID")
            .exec((error, news) => {
                if (error) {
                    res.send('khong the lay thong tin news')
                } else {
                    console.log('lay thanh cong  bai bao')
                    res.send(news)
                    console.log(news)
                }
            })
    }
    getNewsByUserID = (req, res) => {
        newsModel.find({ userID: req.params.id })
            .populate("userID")
            .exec((error, news) => {
                if (error) {
                    res.send('khong the lay thong tin news')
                } else {
                    console.log('lay thanh cong  bai bao')
                    res.send(news)
                    console.log(news)
                }
            })
    }
    getNewsByDate = (req, res) => {
        newsModel.find({
            createdAt: {
                $gte: new Date(`${req.body.dateStart}`),
                $lt: new Date(`${req.body.dateEnd}`)
            }
        })
            .populate("userID")
            .exec((err, news) => {
                if (err) {
                    res.send(err)
                } else {
                    console.log('lay thanh cong');
                    console.log(news);
                    res.send({ total: news.length, news })

                }
            })
    }
    updateNewsById = (req, res) => {
        const { error, value } = newsUpdateValidate(req.body)
        if (error) return res.status(400).send(error.details[0].message)
        newsModel.findByIdAndUpdate(
            { _id: req.params.id },
            value ,
            { upsert: true }
        )
            .exec((error,) => {
                if (error) {
                    res.send('error update')
                } else {
                    console.log('update success')
                    res.send('update success')
                }
            })
    }
    deleteNewsById = (req, res) => {
        newsModel.findByIdAndDelete({ _id: req.params.id }, (err) => {
            if (err) { res.send('error delte') }
            else { res.send('delete success') }
        })
    }

}
module.exports = new newsController()