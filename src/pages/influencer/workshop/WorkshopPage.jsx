import { Button, Row } from 'antd'
import React, { useState } from 'react'
import AddContentsModal from './components/AddContentsModal'

function WorkshopPage() {
    const [contents, setContents] = useState([{content:"teststs"}])
    const [isOpen, setIsOpen] = useState(false)
    const handleAdd = (input) => {
        console.log(input)
        setContents(prev => [...prev, input])
    }
    return (
        <>
            <div>WorkshopPage</div>
            <Row>
                <Button type='primary' onClick={() => setIsOpen(true)}>เพิ่ม</Button>
            </Row>
            {
                contents.map((el, index) => <div>
                    {index} : {el.content}
                </div>)
            }
            <AddContentsModal isOpen={isOpen} setIsOpen={setIsOpen} handleAdd={handleAdd} />
        </>
    )
}

export default WorkshopPage