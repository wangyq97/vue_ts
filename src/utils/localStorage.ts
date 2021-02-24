import { Todo } from "@/interface/todo";

export function setStorage(name: string, todos: Array<Todo>) {
    localStorage.setItem(name, JSON.stringify(todos))
}

export function getStorage(name: string): Array<Todo> {
    return JSON.parse(localStorage.getItem(name) || '[]')
}