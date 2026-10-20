import Form from "../components/Form";

import {it,describe,expect} from "vitest"

import {screen,render} from "@testing-library/react"

const getFormElements = ()=>( {
    titleEle: screen.getByLabelText("Title"),
    buttonEle: screen.getByRole("button")
})

describe("Testing Form Component",()=>{
    it("Should render and with empty initial value",()=>{
        const fakeSubmit = vi.fn()
        render(<Form onSubmit={fakeSubmit}/>)
        const {titleEle,buttonEle} = getFormElements()
        
        expect(titleEle).toBeInTheDocument()
        expect(buttonEle).toBeInTheDocument()

        expect(titleEle).toHaveValue('')
    })
})