import { styled, Typography, Checkbox, Card, CardContent } from '@mui/material';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import styles from './Widget.module.css';

interface WidgetProps {
  order: number;
  title: string;
  isActive: boolean;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
  index: number;
  toggleCheck: (id: number) => void;
}

const Item = styled(CardContent)(({ theme }) => ({
  backgroundColor: '#262B32',
  padding: theme.spacing(2),
  textAlign: 'center',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

export const Widget: FC<WidgetProps> = ({
  order,
  title,
  isActive,
  moveItem,
  index,
  toggleCheck,
}) => {
  const widgetRef = useRef<HTMLDivElement>(null);

  const [, dropRef] = useDrop({
    accept: 'widget',
    hover: (order: { index: number }, monitor) => {
      const dragIndex = order.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = widgetRef.current?.getBoundingClientRect();

      const hoverMiddleY = hoverBoundingRect
        ? (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        : 0;

      const clientOffset = monitor.getClientOffset();

      const hoverClientY =
        clientOffset && hoverBoundingRect ? clientOffset.y - hoverBoundingRect.top : 0;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveItem && moveItem(dragIndex, hoverIndex);
      order.index = hoverIndex;
    },
  });

  const [{ isDrag }, dragRef] = useDrag({
    type: 'widget',
    item: { order, index },
    collect: monitor => ({
      isDrag: monitor.isDragging(),
      item: monitor.getItem(),
    }),
  });

  dragRef(dropRef(widgetRef));
  const opacity = isDrag ? 0 : 1;

  return (
    <Card className={styles.widget} ref={widgetRef} style={{ opacity }}>
      <Item sx={{ minHeight: 110 }}>
        <Typography
          sx={{
            margin: '5px 0 10px',
            color: isActive ? 'gray' : '#fff',
            textDecoration: isActive ? 'line-through' : 'none',
            fontSize: '20px',
          }}>
          {order}
        </Typography>
        <Typography
          sx={{
            margin: '5px 0 10px',
            color: isActive ? 'gray' : '#fff',
            textDecoration: isActive ? 'line-through' : 'none',
            fontSize: '20px',
          }}>
          {title}
        </Typography>
        <Checkbox checked={isActive} onChange={() => toggleCheck(order)} />
      </Item>
    </Card>
  );
};
