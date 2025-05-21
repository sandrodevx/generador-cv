import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical } from '@fortawesome/free-solid-svg-icons';

const SectionOrderManager = ({ sections, onOrderChange }) => {
  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onOrderChange(items);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="sections">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{ minHeight: '100px' }}
          >
            {sections.map((section, index) => (
              <Draggable
                key={section.id}
                draggableId={section.id}
                index={index}
              >
                {(provided, snapshot) => (
                  <Card
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="mb-2"
                    style={{
                      ...provided.draggableProps.style,
                      backgroundColor: snapshot.isDragging ? '#f8f9fa' : 'white',
                      transform: snapshot.isDragging ? provided.draggableProps.style.transform : 'none'
                    }}
                  >
                    <Card.Body className="d-flex align-items-center">
                      <div
                        {...provided.dragHandleProps}
                        style={{ cursor: 'grab', marginRight: '1rem' }}
                      >
                        <FontAwesomeIcon icon={faGripVertical} />
                      </div>
                      <div>
                        <h5 className="mb-0">{section.title}</h5>
                        <small className="text-muted">{section.description}</small>
                      </div>
                    </Card.Body>
                  </Card>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default SectionOrderManager; 