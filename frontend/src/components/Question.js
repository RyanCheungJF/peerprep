import { Box, Button, Divider, Paper } from '@mui/material'

const Question = ({ question, onClick }) => {
  return (
    <Paper sx={{ height: '100%', width: '100%' }} elevation={5}>
      <Box className="question-container">
        <Box className="question-title-and-next-question-button-container">
          <Box className="question-title-wrapper">
            <p className="question-title">Question</p>
          </Box>
          <Box className="question-next-question-button-wrapper">
            <Button
              className="font-inter bg-sky-500 hover:bg-sky-700 text-white font-medium rounded-md px-6"
              onClick={() => onClick()}
            >
              Change Question
            </Button>
          </Box>
        </Box>
        <Divider />
        <Box className="question-details-container">
          <Box className="question-details-wrapper">
            <p
              className="question-details-title"
              dangerouslySetInnerHTML={{ __html: question['title'] }}
            ></p>
            <p
              dangerouslySetInnerHTML={{ __html: question['description'] }}
            ></p>
            <p className="question-details-example-title">Examples:</p>
            <p
              dangerouslySetInnerHTML={{
                __html: 'Input: ' + question['ex_1_input'],
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{
                __html: 'Output: ' + question['ex_1_output'],
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{ __html: question['ex_1_explanation'] }}
            ></p>
            <div className="question-space" />
            <p
              dangerouslySetInnerHTML={{
                __html: 'Input: ' + question['ex_2_input'],
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{
                __html: 'Output: ' + question['ex_2_output'],
              }}
            ></p>
            <p
              dangerouslySetInnerHTML={{ __html: question['ex_2_explanation'] }}
            ></p>
            <div className="question-space" />
            {question['ex_3_input'] && (
              <p
                dangerouslySetInnerHTML={{
                  __html: 'Input: ' + question['ex_3_input'],
                }}
              ></p>
            )}
            {question['ex_3_output'] && (
              <p
                dangerouslySetInnerHTML={{
                  __html: 'Output: ' + question['ex_3_output'],
                }}
              ></p>
            )}
            <p
              dangerouslySetInnerHTML={{ __html: question['ex_3_explanation'] }}
            ></p>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}

export default Question
