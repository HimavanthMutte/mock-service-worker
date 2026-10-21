import Item from "../components/Item"

import {it,describe,expect} from "vitest"

import {screen,render} from "@testing-library/react"

import userEvent, { UserEvent } from "@testing-library/user-event"


const fakeLike = vi.fn()
const fakeDelete = vi.fn()

const mockData = {
    id: "1",
    title: "NewsLetter",
    likes: 10
}

let user: UserEvent

const getItemElements = () =>({
    headingEle: screen.getByRole("heading",{level: 3}),
    likeEle: screen.getByRole("button",{name: /👍 10/}),
    deleteEle: screen.getByRole("button",{name: "Delete"})
})

describe("Testing Item Component",()=>{
    beforeEach(()=>{
        render(<Item post ={mockData} onLike={fakeLike} onDelete={fakeDelete}/>)
        user = userEvent.setup()
    })

    it("should redner item with mock data and buttons",async()=>{
        const {headingEle,likeEle,deleteEle} = getItemElements()
        expect(headingEle).toBeInTheDocument()
        expect(likeEle).toBeInTheDocument()
        expect(deleteEle).toBeInTheDocument()

        await user.click(likeEle)

        await user.click(deleteEle)

        expect(fakeDelete).toHaveBeenCalledOnce()
        expect(fakeLike).toHaveBeenCalledTimes(1)

        expect(fakeDelete).toHaveBeenCalledWith(mockData.id);
        expect(fakeLike).toHaveBeenCalledWith(mockData.id);
    })
})