package nl.hu.s3.project.todos.domain;

import java.util.List;


public class ToDoList /*implements List<ToDoItem>*/ { //Ik was net te lui om die interface te implementeren...

    public ToDoList(List<ToDoItem> items){
        this.items = items;
    }

    private List<ToDoItem> items;

    public List<ToDoItem> items() {
        return items;
    }
}
