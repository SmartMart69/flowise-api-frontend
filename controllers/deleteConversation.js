export const deleteConversation = async (req, res) => {
  const { sessionId } = req.body;

  try {
    if (!sessionId) {
      return res.status(400).json({ error: "sessionId ist erforderlich." });
    }

    const response = await fetch(
      `${process.env.FLOWISE_URL}/api/v1/chatmessage/${process.env.FLOW_ID}?sessionId=${sessionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Basic " +
            Buffer.from(
              process.env.FLOWISE_USERNAME + ":" + process.env.FLOWISE_PASSWORD
            ).toString("base64"),
        },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Fehler beim Löschen der Nachrichten." });
    }

    const result = await response.json();
    return res.status(200).json({ message: "Nachrichten gelöscht.", result });
  } catch (error) {
    console.error("Fehler:", error);
    return res.status(500).json({ error: "Interner Serverfehler." });
  }
};
