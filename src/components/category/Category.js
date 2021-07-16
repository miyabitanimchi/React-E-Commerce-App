import React, { useState, useEffect } from 'react';
import { useProductsContext } from '../../context/products-context';
import ItemList from '../itemList/ItemList';


const Category = (props) => {


    const { products, itemDescription, setItemDescription } = useProductsContext();
    console.log(itemDescription)

    const [categoryResult, setcategoryResult] = useState([])
    const [categoryKey, setcategoryKey] = useState("")
    const [categoryTitle, setcategoryTitle] = useState("")

    const categoryKeyWords = props.match.params.type

    const catagoryFilter = () => {

        setcategoryKey(categoryKeyWords)

        const category = products.filter((name) => name.category === categoryKey)

        // setcategoryTitle(product.category)
        setcategoryResult(category)
        setItemDescription(true)
    }

    useEffect(() => {
        catagoryFilter()
    }, [categoryKey, categoryKeyWords, products])

    console.log(props)


    return (
        <>
            {categoryResult === null ? catagoryFilter() :
                <div className={categoryKey}>
                    <ItemList item={categoryResult} title={`All result for "${categoryKeyWords}"`} listClass={"itemList"} wrapClass={"itemWrap"} description={true} />
                </div>}
        </>
    )
}

export default Category