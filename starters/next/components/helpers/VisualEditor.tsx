"use client"

import { useState , ReactNode } from "react";
import {arrayMove, SortableContext, useSortable } from '@dnd-kit/sortable';
import {DndContext, DragEndEvent} from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

import type { VisualEditorComponentProps } from "drupal-visual-editor"
import { openVisualEditorComponent, syncDrupalComponentOrder } from "drupal-visual-editor"

interface VisualEditorComponentContainerProps extends VisualEditorComponentProps {
  children?: React.ReactNode;
}

function VisualEditorComponentContainer(
  { action, storage, uuid, children }: VisualEditorComponentContainerProps
) {
  return (
    <section
      id={`${storage}-${uuid}`}
      data-visual-editor-component={`${storage}-${uuid}`}
      onDoubleClick={() => openVisualEditorComponent({
        action,
        storage,
        uuid,
      })}
    >
      {children}
    </section>
  )
}

interface SortableItemProps {
  id: string;
  children: ReactNode;
}

type VisualEditorProps = {
  ids: Array<string>;
  componentMapping: { [key: string]: JSX.Element };
}

function SortableComponent({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <VisualEditorComponentContainer storage="paragraph" uuid={id} action="edit" key={id}>
        {children}
      </VisualEditorComponentContainer> 
    </div>
  );
}

export function VisualEditor({ ids, componentMapping }: VisualEditorProps) {  
  const [items, setItems] = useState(ids);

  function handleDragEnd(event:DragEndEvent) {
    const {active, over} = event;

    if (!over) {
      return;
    }
  
    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id.toString()) ;
        const newIndex = items.indexOf(over.id.toString());

        const newItems = arrayMove(items, oldIndex, newIndex);

        const changes = {
          items: {
            original: items as Array<string>,
            updated: newItems as Array<string>,
          },
          active: {
            id: active.id as string,
            index: oldIndex,
          },
          over: {
            id: over.id as string,
            index: newIndex,
          }
        };

        syncDrupalComponentOrder(changes);

        return newItems;
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} id="components" key={"components"}>
      <SortableContext items={items}>
      {items.map((id:string) => {
        const component = componentMapping[id];
        return <SortableComponent key={id} id={id}>{component}</SortableComponent>;
      })}
      </SortableContext>
    </DndContext>
  );
}