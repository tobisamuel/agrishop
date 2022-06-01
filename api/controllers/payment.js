import axios from "axios";

export const verifyPayment = async (req, res) => {
  const ref = req.body.ref;
  // console.log(ref);

  try {
    const request = await axios.get(
      `https://api.paystack.co/transaction/verify/${ref}`,
      {
        headers: {
          "Content-type": "application/json",
          Authorization:
            "Bearer sk_test_8e19b57839f7a855a7deca5d868850a9ecf26e17",
        },
      }
    );
    res.json(request.data);
  } catch (error) {}
};
