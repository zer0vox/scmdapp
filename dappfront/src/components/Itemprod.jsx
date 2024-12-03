const Itemprod = ({ state }) => {
  const produceItemByManufacturer = async (event) => {
    event.preventDefault();
    const { contract } = state;
    const stockunit = document.querySelector("#stockunit").value;
    const productCode = document.querySelector("#productCode").value;
    const manufacturerName = document.querySelector("#manufacturerName").value;
    const manufacturerInformation = document.querySelector(
      "#manufacturerInformation"
    ).value;
    const productNotes = document.querySelector("#productNotes").value;
    const productPrice = document.querySelector("#productPrice").value;
    const transaction = await contract.produceItemByManufacturer(
      stockunit,
      productCode,
      manufacturerName,
      manufacturerInformation,
      productNotes,
      productPrice
    ); // function from smart contract
    await transaction.wait();
    console.log(
      stockunit,
      productCode,
      manufacturerInformation,
      manufacturerName,
      productNotes,
      productPrice
    );
  };

  return (
    <>
      <form onSubmit={produceItemByManufacturer}>
        <input id="stockunit" />
        <input id="productCode" />
        <input id="manufacturerName" />
        <input id="manufacturerInformation" />
        <input id="productNotes" />
        <input id="productPrice" />
        <button>Submit</button>
      </form>
    </>
  );
};

export default Itemprod;
