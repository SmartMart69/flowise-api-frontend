import fetch from "node-fetch";

export const createPrediction = async (req, res) => {
  const {
    message,
    sessionId,
    abteilung,
    imageBase64,
    imageName,
    imageMime,
    audioBase64,
    audioName,
    audioMime,
  } = req.body;

  try {
    // Grundlegende Daten für die Prediction API
    const flowiseData = {
      question: message,
      overrideConfig: {
        sessionId: sessionId || "",
        pineconeNamespace: abteilung || "Sonstige",
      },
    };

    // Überprüfe, ob Bilddaten vorhanden sind
    if (imageBase64 && imageName && imageMime) {
      if (!flowiseData.uploads) {
        flowiseData.uploads = [];
      }
      flowiseData.uploads.push({
        data: `data:${imageMime};base64,${imageBase64}`, // Inkludiere das vollständige Data-URL-Format
        type: "file",
        name: imageName,
        mime: imageMime,
      });
    }

    // Überprüfe, ob Audiodaten vorhanden sind
    if (audioBase64 && audioName && audioMime) {
      if (!flowiseData.uploads) {
        flowiseData.uploads = [];
      }
      flowiseData.uploads.push({
        data: `data:${audioMime};base64,${audioBase64}`, // Inkludiere das vollständige Data-URL-Format
        type: "audio",
        name: audioName,
        mime: audioMime,
      });
    }

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
