export default function taskReducer(tasksState, actions) {
    switch(actions.type) {
        case "added": {
            return [
                ...tasksState,
                {
                    id: actions.id,
                    task: actions.task,
                    seen: false,
                }
            ]
        }

        case "changed": {
            return tasksState.map((t) => {
                if (t.id === actions.task.id) {
                    return actions.task;
                } else {
                    return t;
                }
            });
        }

        case 'deleted' : {
            return tasksState.filter(t => t.id !== actions.id);
        }

        default: {
            throw Error("please check your code");
        }

    }

}