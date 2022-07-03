const User = require('../models/user')

module.exports.renderRegister = (req, res) => {
    res.render('user/register')
}

module.exports.register = (async (req, res, next) => {
    try {
        const { email, username, password } = req.body
        const user = new User({ email, username })
        const registeredUser = await User.register(user, password)
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Yelp Camp!');
            res.redirect('/campgrounds');
        })
    }
    catch (e) {
        req.flash('error', e.message)
        res.redirect('/register')
    }
})

module.exports.renderLogin = (req, res) => {
    res.render('user/login')
}

module.exports.login = (req, res) => {
    console.log(req.session)
    req.flash('success', 'Welcome Back!!!')
    const redirectUrl = req.session.returnTo || '/campgrounds'
    delete req.session.returnTo
    // console.log(req.session)
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout((err) => {
        if (err) return next(err)
        req.flash('success', 'Logged out successfully')
        res.redirect('/campgrounds')
    })
}

