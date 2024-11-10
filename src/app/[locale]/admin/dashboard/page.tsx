import { Col, Row } from "@/shadcn/ui/layouts";

export default function DashboardPage() {

  const userStats = [
    { id: 1, title: "전체 유저", content: 0 },
    { id: 2, title: "신규 유저", content: 0 },
    { id: 3, title: "신규 작품", content: 0 },
    { id: 4, title: "신규 오퍼", content: 0 }
  ];

  return (
    <>
      <h1 className="font-bold text-[18pt]">대시보드</h1>
      <Row className="w-full justify-between">
        {userStats.map((item) => (
          <Col
            key={item.id}
            className="w-[23%] p-5 rounded-md border border-gray"
          >
            <p>{item.title}</p>
            <p className="text-[40pt]">{item.content}</p>
          </Col>
        ))}
      </Row>
    </>
  );
}