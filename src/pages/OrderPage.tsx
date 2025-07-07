import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import Layout from '@/components/Layout';



export const OrderPage = () => {
  const { productId } = useParams();

  return (
    <Layout>
      
    </Layout>
  );
};
export default OrderPage;
