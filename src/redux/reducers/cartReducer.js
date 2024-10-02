const initialState = {
    cartItems: []
}

const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_TO_CART':
            const item = action.payload
            const isItemExists = state.cartItems.find(i => i.id === item.id)
            if (isItemExists) {
                return {
                    ...state,
                    cartItems: state.cartItems.map(i => i.id === isItemExists.id ? item : i)
                }
            }
            else {
                return {
                    ...state,
                    cartItems: [...state.cartItems,item]
                }
            }

        default:
            return state
    }
}

export default cartReducer