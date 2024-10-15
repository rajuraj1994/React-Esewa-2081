import axios from 'axios'
import { APP_URL } from '../../config'

export const addItemToCart = id => async (dispatch, getState) => {
    const { data } = await axios.get(`${APP_URL}/productdetails/${id}`)
    dispatch({
        type: 'ADD_TO_CART',
        payload: {
            id: data._id,
            title: data.product_name,
            price: data.product_price,
            stock:data.countInStock,
            image: data.product_image,
            category: data.category.category_name,
            quantity: 1

        }
    })
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
}
