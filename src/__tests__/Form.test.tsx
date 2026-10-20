import Form from "../components/Form";

import {it,describe,expect} from "vitest"

import {screen,render} from "@testing-library/react"

import userEvent, { UserEvent } from "@testing-library/user-event"

const getFormElements = ()=>( {
    titleEle: screen.getByLabelText("Title"),
    buttonEle: screen.getByRole("button")
})

let user: UserEvent;

const fakeSubmit = vi.fn()

beforeEach(()=>{
    render(<Form onSubmit={fakeSubmit}/>)
    user = userEvent.setup() 
})

describe("Testing Form Component",()=>{
    it("Should render and with empty initial value",()=>{
        const {titleEle,buttonEle} = getFormElements()
        
        expect(titleEle).toBeInTheDocument()
        expect(buttonEle).toBeInTheDocument()

        expect(titleEle).toHaveValue('')
    })

    it("Should have working Submit button", async () => {
    const { titleEle, buttonEle } = getFormElements();

    await user.type(titleEle, "My first post");
    await user.click(buttonEle);

    expect(fakeSubmit).toHaveBeenCalledTimes(1);

    expect(fakeSubmit).toHaveBeenCalledWith({
        title: "My first post",
        likes: 0
    });
});
})