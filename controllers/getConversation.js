import fetch from "node-fetch";

export const getConversation = async (req, res) => {
  const { sessionId } = req.body;

  try {
    const response = await fetch(
      `https://immune-sawfish-52912.upstash.io/LRANGE/${sessionId}/0/-1`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.UPSTASH_API_KEY}`,
        },
      }
    );

    const data = await response.json();
    const history = data.result.map((entry) => JSON.parse(entry));

    res.status(200).json({ history });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
