export const createPrediction = async (req, res) => {
  const { message, sessionId } = req.body;

  try {
    // Grundlegende Daten für die Prediction API
    const flowiseData = {
      question: message,
      overrideConfig: {
        sessionId: sessionId || "",
      },
    };

    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/prediction/${process.env.FLOW_ID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`,
        },
        body: JSON.stringify(flowiseData),
      }
    );

    const data = await response.json();
    console.log(data);

    res.status(200).json({ message: data.text });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
