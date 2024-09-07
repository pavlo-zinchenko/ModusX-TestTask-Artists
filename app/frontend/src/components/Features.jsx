import { Box, Card, Typography } from '@mui/material';
import { FEATURES } from '@constants/features';

export default function Features() {
  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      <Typography
        variant="h4"
        sx={{ fontWeight: 'bold', mb: 2 }}
      >
        Why Choose Our App?
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            alignItems: 'center',
          }}
        >
          {FEATURES.map((feature, index) => (
            <Card
              key={index}
              sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 2,
                boxShadow: 3,
                flexBasis: '300px',
                flexGrow: 1,
                flexShrink: 0,
                maxWidth: '300px',
                margin: 2,
                order: index === 1 ? { xs: 3, sm: 3, md: 'initial' } : 'initial',
                '@media (min-width: 600px) and (max-width: 995px)': {
                  order: index === 1 ? 3 : 'initial',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 2
                }}
              >
                {feature.icon}
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 2
                }}>
                {feature.title}
              </Typography>
              <Typography variant="body1">
                {feature.description}
              </Typography>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
