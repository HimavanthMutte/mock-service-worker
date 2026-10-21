import List from "../components/List"

import {it,describe,expect} from "vitest"

import {screen,render} from "@testing-library/react"

import userEvent, { UserEvent } from "@testing-library/user-event"

const mockData = [{
    id: "1",
    title: "Post-1",
    likes: 10
},{
    id: "2",
    title: "Post-2",
    likes: 20
}]

const fakeLike = vi.fn()
const fakeDelete = vi.fn()

describe("Testing List Component",()=>{
    beforeEach(()=>{
        render(<List posts={mockData} onDelete={fakeDelete} onLike={fakeLike} />)
    })


    it("should render all elements",()=>{
        expect(screen.getAllByRole("button")).toHaveLength(mockData.length*2)
        expect(screen.getAllByRole("heading",{level: 3})).toHaveLength(mockData.length)
        mockData.map(post=>{
            expect(screen.getByRole("button",{name: `👍 ${post.likes}`})).toBeInTheDocument()
        })
        const articles = screen.getAllByRole('article');
        expect(articles).toHaveLength(2);
    })
})