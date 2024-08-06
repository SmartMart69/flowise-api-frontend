import fetch from "node-fetch";

export const deleteConversation = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const response = await fetch(
      `https://immune-sawfish-52912.upstash.io/DEL/${sessionId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_API_KEY}`, // Verwende den API-Schlüssel aus der Umgebungsvariable
        },
      }
    );

    if (response.ok) {
      res.status(200).json({ message: "Konversation erfolgreich gelöscht." });
    } else {
      res
        .status(response.status)
        .json({ message: "Fehler beim Löschen der Konversation." });
    }
  } catch (error) {
    res.status(500).json({
      message: "Löschen der Konversation fehlgeschlagen.",
      error: error.message,
    });
  }
};
