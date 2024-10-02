import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { ColorRing } from 'react-loader-spinner'
import Card from './Card'
import { APP_URL } from '../config'

const CardContainer = () => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        const fetchProduct= async()=>{
            try{
                const response = await axios.get(`${APP_URL}/productlist`)
                setProducts(response.data)
                setLoading(false)
            }
            catch(error){
                console.log(error)
            }
        }
        //simulate 2 seconds delay time before fetching the products
        const delay= setTimeout(()=>{
            fetchProduct()
            clearTimeout(delay)
        },2000)
    },[])

  return (
    <>
    {
        loading ? (
            <div style={{display:'flex', justifyContent:'center',alignItems:'center',height:'50vh'}}>
                <ColorRing
                    visible={true}
                    height="80"
                    width="80"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
                    />
            </div>
        ):(
            <div className="container-fluid">
        <div className="row row-cols-1 row-cols-md-4 g-4">
          {products &&
            products
              .slice(0, 8)
              .map((item, i) => <Card key={i} data={item} />)}
        </div>
        </div>
        )}
    </>
  )
}

export default CardContainer