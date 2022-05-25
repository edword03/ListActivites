import { FC, useCallback } from 'react';
import { Typography, Box } from '@mui/material';

import { Widget } from '../widget/Widget';
import { WidgetType } from '../../types/WidgetType';

interface ColumnProps {
  widgets: WidgetType[];
  setWidgets: (list: WidgetType[]) => void;
}

export const Column: FC<ColumnProps> = ({ widgets, setWidgets }) => {
  const moveItem = useCallback(
    (dragIndex: number, hoverIndex: number) => {
      const dragItem = widgets[dragIndex];
      const newItem = [...widgets];
      newItem.splice(dragIndex, 1);
      newItem.splice(hoverIndex, 0, dragItem);

      setWidgets(newItem);
    },
    [setWidgets, widgets],
  );

  const toggleCheck = useCallback(
    (id: number) => {
      const newWidgets = widgets.map(item =>
        item.id === id ? { ...item, isActive: !item.isActive } : item,
      );
      setWidgets(newWidgets);
    },
    [setWidgets, widgets],
  );

  return (
    <div style={{ minHeight: 360 }}>
      <Box>
        <Typography component={'h1'} color="#fff" marginBottom={3} textAlign="center" fontSize={22}>
          List of activities
        </Typography>
        {widgets &&
          widgets.map((item, index) => (
            <Widget
              key={item.id}
              order={item.id}
              title={item.title}
              isActive={item.isActive}
              moveItem={moveItem}
              index={index}
              toggleCheck={toggleCheck}
            />
          ))}
      </Box>
    </div>
  );
};
