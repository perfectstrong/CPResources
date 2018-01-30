cp.InteractiveItemQuestion = function(a, b) {
    cp.InteractiveItemQuestion.baseConstructor.call(this, a, b);
    this.m_item = void 0
};
cp.inherits(cp.InteractiveItemQuestion, cp.Question);
cp.InteractiveItemQuestion.prototype.getIsInteractiveWidget = function() {
    return !1
};
cp.InteractiveItemQuestion.prototype.startQuestion = function() {
    cp.InteractiveItemQuestion.superClass.startQuestion.call(this);
    this.setInteractionQuestionState();
    0 == this.currentAttempt && this.enable();
    this.m_quizController.GetIsInReviewMode() && this.disable()
};
cp.InteractiveItemQuestion.prototype.endQuestion = function(a) {
    if (this.state == this.StateEnum.PLAYING || this.state == this.StateEnum.PAUSED)(!this.m_quizController || !this.m_quizController.GetIsInReviewMode()) && this.saveAnswerOrder(), this.m_questionScore && this.setQuestionSpecificScoreProperties(this.m_questionScore.m_questionSpecificScore);
    a ? cp.InteractiveItemQuestion.superClass.endQuestion.call(this, a) : this.flushToLMS()
};
cp.InteractiveItemQuestion.prototype.flushToLMS = function() {
    if (this.m_questionScore) {
        this.m_questionScore.m_answerScores = this.getAnswerScores();
        var a = this.getIsIncomplete();
        this.m_questionScore.m_answersIncomplete = a;
        this.m_questionScore.m_answeredCorrectly = this.getAnsweredCorrectly();
        this.m_questionScore.m_isShuffled = this.m_isShuffled;
        this.m_questionScore.m_partiallyCorrect = this.getIsPartiallyCorrect();
        this.m_questionScore.m_wasJudged = this.wasJudged;
        this.m_questionScore.m_scoredPoints = this.getScore()
    }
    var a =
        this.m_quizController.GetPlaybackController(),
        b = a.GetSendCourseDataWithInteractionData(),
        c = this.m_quizController && this.m_quizController.GetIsSubmitAll() && !this.getIsPretest();
    b && !c && ((b = a.GetLMSType()) && (b = b.toUpperCase()), a.GetIsTracked() && "EMAIL" != b && "ACROBAT" != b && "INTERNALSERVER" != b ? a.SendCourseData(!0) : a.SendCourseData(!1))
};
cp.InteractiveItemQuestion.prototype.enable = function() {};
cp.InteractiveItemQuestion.prototype.disable = function() {};
cp.InteractiveItemQuestion.prototype.setInteractionQuestionState = function() {};
cp.InteractiveItemQuestion.prototype.saveAnswerOrder = function() {
    this.m_questionScore && (this.m_answerOrderArray = [])
};
cp.InteractiveItemQuestion.prototype.disableAnswers = function() {};
cp.InteractiveItemQuestion.prototype.disableAllOptions = function() {
    if (this.m_quizController) {
        var a = !0;
        this.m_quizController.GetIsSubmitAll() && !this.getIsPretest() && (!this.m_quizController.GetIsInReviewMode() && !this.m_quizController.m_submittedAllQuestions) && (a = !1);
        a && (this.disableAnswers(), this.m_answersDisabled = !0)
    }
};
cp.InteractiveItemQuestion.prototype.setQuestionSpecificScoreProperties = function(a) {
    void 0 != a && (a.m_answerOrderArrayAsString = "")
};
cp.InteractiveItemQuestion.prototype.restoreFromQuestionSpecificScoreProperties = function() {};