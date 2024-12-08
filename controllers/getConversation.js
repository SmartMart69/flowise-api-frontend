export const getConversation = async (req, res) => {
  const { sessionId } = req.body;

  try {
    if (!sessionId) {
      return res.status(400).json({ error: "sessionId ist erforderlich." });
    }

    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/chatmessage/${process.env.FLOW_ID}?sessionId=${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.FLOWISE_API_KEY}`,
        },
      }
    );

    const data = await response.json();

    const history = data.map((entry) => ({
      content: entry.content,
      role: entry.role,
      createdDate: entry.createdDate,
    }));

    // Die ungefilterten Daten direkt zurückgeben
    res.status(200).json(history);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
