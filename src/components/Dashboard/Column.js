import { Card } from '@mui/material'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import Task from './Task'

const Column = ({ section }) => {

    const getItemStyle = (draggableStyle) => {
        return {
            padding: 8,
            marginBottom: 8,
            ...draggableStyle
        }
    }

    return (
        <div>
            {section?.tasks?.map((task, index) =>
            (
                <Draggable draggableId={task.id} key={task.id} index={index}>
                    {(provided) => (
                        <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(provided.draggableProps.style)}
                        >
                            <Task task={task} />
                        </Card>
                    )}
                </Draggable>
            )
            )}
        </div>
    )
}

export default observer(Column)