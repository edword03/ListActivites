import { useEffect, useState } from 'react';
import { Box, Container } from '@mui/material';
import { Column } from './columns/Column';
import { WidgetType } from '../types/WidgetType';

function App() {
  const [widgets, setWidgets] = useState<WidgetType[]>([]);

  useEffect(() => {
    fetch('task.json')
      .then(res => res.json())
      .then(data => {
        setWidgets(Object.values(data.data));
      });
  }, []);

  return (
    <div className="App">
      <Container style={{ marginTop: 50 }}>
        <Box sx={{ minHeight: 393 }}>
          <Column widgets={widgets} setWidgets={setWidgets} />
        </Box>
      </Container>
    </div>
  );
}

export default App;
