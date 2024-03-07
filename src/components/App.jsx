import React, { useState } from 'react';
import FeedbackOptions from './feedbackOptions/FeedbackOptions';
import Section from './section/Section';
import Statistics from './statistics/Statistics';
import css from '../App.module.css';
import Notification from './notification/Notification';

const initialState = {
  good: 0,
  neutral: 0,
  bad: 0,
};

const App = () => {
  const [feedback, setFeedback] = useState(initialState);

  const handleStatisticsReaction = option => {
    setFeedback(prevState => {
      return { ...prevState, [option]: prevState[option] + 1 };
    });
  };

  const countTotalFeedback = () => {
    return Object.values(feedback).reduce((acc, value) => acc + value, 0);
  };

  const countPositiveFeedbackPercentage = () => {
    const totalFeedback = countTotalFeedback();
    return totalFeedback > 0
      ? Math.round((feedback.good / totalFeedback) * 100)
      : 0;
  };

  const totalFeedback = countTotalFeedback();
  const PositivePercentage = countPositiveFeedbackPercentage();
  return (
    <div className={css.container}>
      <Section title="Please leave feedback">
        <FeedbackOptions
          feedbackOptions={Object.keys(feedback)}
          handleStatisticsReaction={handleStatisticsReaction}
        />
      </Section>
      {totalFeedback ? (
        <>
          <Section title="Statistics">
            <Statistics
              good={feedback.good}
              neutral={feedback.neutral}
              bad={feedback.bad}
              total={totalFeedback}
              positivePercentage={PositivePercentage}
            />
          </Section>
        </>
      ) : (
        <Notification title={'There is no feedback'} />
      )}
    </div>
  );
};

export default App;
