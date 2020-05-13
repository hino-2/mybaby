import Cookies from 'universal-cookie'

export const isMobile = () => {
    return /Mobi|Android/i.test(navigator.userAgent) || window.innerWidth < 760
}

export const formatDate = (date) => {
    // dd.mm.yyyy
    const _date = new Date(date)
    return `${_date.getDate()
                   .toString()
                   .padStart(2, 0)}.${(_date.getMonth() + 1).toString()
                                                            .padStart(2, 0)}.${_date.getFullYear()}`
}

export const setUserCookie = (name, user) => {
    const cookie = new Cookies()
    cookie.set(name, user, {path: "/", maxAge: 3600})
}