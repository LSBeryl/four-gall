import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { data } from './book.json'

export default function Book() {
  // 번호, 일자, 구분, 항목, 수입, 지출, 총액, 비고, 증빙
  return (
    <Wrap>
      <Title>2024 학급회 예산 기록표</Title>
      <TableWrap>
        <Table>
          <Thead>
            <Tr>
              <Td>번호</Td>
              <Td>일자</Td>
              <Td>구분</Td>
              <Td>항목</Td>
              <Td>수입</Td>
              <Td>지출</Td>
              <Td>총액</Td>
              <Td>비고</Td>
              <Td>증빙</Td>
            </Tr>
          </Thead>
          <Tbody>
            {data.map(v => (
              <Tr>
                <Num>{v.num}</Num>
                <Date>{v.date}</Date>
                <Division>
                  {v.type == 'income' ? <Blue>{v.div}</Blue> : <Red>{v.div}</Red>}
                </Division>
                <What>{v.what}</What>
                <Money>₩{v.income}</Money>
                <Money>₩{v.spent}</Money>
                <Money>₩{v.total}</Money>
                <Note>{v.note}</Note>
                <Proof>
                  {v.link ? <Link to={v.link}>링크</Link> : ''}
                </Proof>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrap>
    </Wrap>
  )
}

const Wrap = styled.div`
  overflow: auto;
`

const TableWrap = styled.div`
  overflow: auto;
`

const Title = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
`

const Table = styled.table`
  margin-top: 1rem;
  border-collapse: collapse;
`

const Thead = styled.thead`
  & td {
    text-align: center;
    background: #ebebeb;
    font-size: 0.8rem;
    padding: 0.2rem;
    border: 1px solid #c1c1c1;
  }
`

const Tbody = styled.tbody`
  & td {
    font-size: 0.8rem;
    padding: 0.2rem;
    border: 1px solid #c1c1c1;
  }
`

const Tr = styled.tr`
  
`

const Td = styled.td`
  
`

const Num = styled.td`
  text-align: center;
  width: 2rem;
  min-width: 2rem;
`

const Date = styled.td`
  width: 3.5rem;
  min-width: 3.5rem;
`

const Division = styled.td`
  width: 6rem;
  min-width: 6rem;
`

const What = styled.td`
  width: 10rem;
  min-width: 10rem;
`

const Money = styled.td`
  text-align: right;
  width: 4rem;
  min-width: 4rem;
`

const Note = styled.td`
  width: 10rem;
  min-width: 10rem;
`

const Proof = styled.td`
  width: 5rem;
  min-width: 5rem;
  text-align: center;
`

const Blue = styled.div`
  border-radius: 30px;
  background: #beddff;
  box-sizing: border-box;
  padding-inline: 0.2rem;
  color: #0121bf;
`

const Red = styled.div`
  border-radius: 30px;
  background: #ffbab1;
  box-sizing: border-box;
  padding-inline: 0.2rem;
  color: #810000;
`