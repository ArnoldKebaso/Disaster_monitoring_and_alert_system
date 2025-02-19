const sessions = {};

const handleUSSD = async (req, res) => {
    const { phoneNumber, sessionId, text, networkCode } = req.body;

    let response = '';
    const currentStep = text ? text.split('*').length : 0;

    try {
        if (!text) {
            // Initial menu
            response = `CON Welcome to My Service
                    1. Check Balance
                    2. Subscribe
                    3. Exit`;
        } else {
            const choices = text.split('*');
            const lastChoice = choices[choices.length - 1];

            switch (currentStep) {
                case 1:
                    if (lastChoice === '1') {
                        response = `END Your balance: KES 500`;
                    } else if (lastChoice === '2') {
                        response = `CON Enter subscription duration:
1. 1 Week
2. 1 Month`;
                    } else if (lastChoice === '3') {
                        response = `END Thank you for using our service`;
                    }
                    break;
                case 2:
                    if (['1', '2'].includes(lastChoice)) {
                        const duration = lastChoice === '1' ? '1 Week' : '1 Month';
                        response = `END You've subscribed for ${duration}`;
                    } else {
                        response = `END Invalid selection`;
                    }
                    break;
                default:
                    response = `END Invalid input`;
            }
        }

        // Store session data if needed
        sessions[sessionId] = {
            lastStep: currentStep,
            phoneNumber,
            lastUpdated: Date.now()
        };

        res.set('Content-Type', 'text/plain');
        res.send(response);

    } catch (error) {
        console.error(`USSD Error [${sessionId}]:`, error);
        res.set('Content-Type', 'text/plain');
        res.send(`END Service temporarily unavailable`);
    }
};

module.exports = { handleUSSD };