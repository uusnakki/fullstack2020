const anecdoteReducer = (state = '', action) => {
    switch (action.type) {
        case 'VOTED_BLOG':
            return action.data
        case 'HIDE':
            return state = ''
        default:
            return state
    }
}

export const voteNotification = (content, seconds) => {
    return async dispatch => {
        const timer = setTimeout(() => {
            dispatch(hideNotification())
        }, seconds * 1000)

        dispatch({
            type: 'VOTED_BLOG',
            data: { content, timer }
        })

    }
}

export const hideNotification = () => {
    return {
        type: 'HIDE'
    }
}

export default anecdoteReducer