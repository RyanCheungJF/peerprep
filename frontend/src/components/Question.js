import { Box } from '@mui/material'

const Question = ({ question }) => {
  return (
    <Box className="question-display">
      <p
        className="question-title"
        dangerouslySetInnerHTML={{ __html: question['title'] }}
      ></p>
      <p dangerouslySetInnerHTML={{ __html: question['description'] }}></p>
      <br />
      <p className="example-title">Examples:</p>
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
      <p dangerouslySetInnerHTML={{ __html: question['ex_1_explanation'] }}></p>
      <br />
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
      <p dangerouslySetInnerHTML={{ __html: question['ex_2_explanation'] }}></p>
      <br />
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
      <p dangerouslySetInnerHTML={{ __html: question['ex_3_explanation'] }}></p>
    </Box>
  )
}

export default Question
