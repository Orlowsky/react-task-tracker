import Task from './Task'
//jakbysmy statow nie mieli czy cos no ale mamy wiec chuj z tym 
// const tasks=[
//     {
//         id:0,
//         title:"new Title"
//     },
//     {
//         id:1,
//         title:"new Title 1"
//     }
// ]
const Tasks = ({tasks, onDelete,onToggle}) => {
   
        
    return (
        
        <>

            {
            tasks.map((task)=>
                (<Task key={task.id} task={task} onToggle={onToggle} onDelete={onDelete} />)
            )}
        </>
    )
}

export default Tasks
