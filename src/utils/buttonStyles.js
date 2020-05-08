export const bigButton = {
    root: {
        background: '#ff3a69', 
        borderRadius: 3,
        border: '2px solid white',
        color: 'white',
        height: 62,
        width: 300,
        lineHeight: 'normal',
        padding: '0 20px',
        minWidth: '100px',
        "&:hover": {
            backgroundColor: "#ff003d",
        }
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '22px',
        color: 'white',
        textShadow: '-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 10px 10px 2px rgba(206,89,55,0)'
    },
}

export const smallButton = {
    root: {
        background: '#ff3a69',  
        borderRadius: 3,
        border: '2px solid white',
        color: 'white',
        height: 40,
        width: 'calc(100% - 10px)',
        lineHeight: 'normal',
        padding: '0 20px',
        "&:hover": {
          backgroundColor: "#ff003d",
        }
    },
    label: {
        textTransform: 'capitalize',
        fontSize: '18px',
        color: 'white',
        textShadow: '-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 10px 10px 2px rgba(206,89,55,0)'
    },
}

export const submitButton = {
    root: {
        background: 'forestgreen',
        borderRadius: 3,
        border: '2px solid white',
        height: 30,
        width: 30,
        minWidth: 30,
        minHeight: 30,
        padding: 0,
        '&:hover': {
            background: '#017301'
        },
    },
    label: {
        fontSize: '18px',
        color: 'white',
        textShadow: '-1px -1px 1px rgba(255,255,255,.1), 1px 1px 1px rgba(0,0,0,.5), 10px 10px 2px rgba(206,89,55,0)'
    },
}