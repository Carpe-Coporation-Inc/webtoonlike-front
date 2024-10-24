import { Container, Gap } from "@/ui/layouts";
import { ManageInvoiceList } from "./ManageInvoiceList";

export function BuyerInvoiceListPage() {
  return (
    <Container className="bg-[#121212]">
      <Gap y={20} />
      <ManageInvoiceList />
      <Gap y={20} />

      <Gap y={40} />
    </Container>
  );
}