import Calculator from "@/src/components/app/cards/calculatorCard";
import Table from "@/src/components/ui/composites/table";
export default function page() {
      const dataSet = [
        {
            name: "John",
            age: "20",
            sex: "female",
            school: "MJS"
        },
        {
            age: "",
            name: "John",
            sex: "female",
            school: "MJS"
        },
        {
            name: "John",
            age: "20",
            sex: "female",
            school: ""

        }
    ]

  return (
    <div className={`w-[100%] h-[100%]`}>
      <Table width="500px" height="300px" data={dataSet} size="xs"/>
    </div>
  )
}
