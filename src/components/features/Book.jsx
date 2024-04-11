import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { data } from './book.json'

export default function Book() {
  /**현재 행 인덱스를 받아 data에서 그 행까지의 총합을 리턴*/
  function total(num) {
    let sum = 0
    for(let i = 0; i <= num; i++) {
      sum += Number(data[i].income)
      sum -= Number(data[i].spent)
    }
    return sum.toLocaleString()
  }

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
            {data.map((v, i) => (
              <Tr>
                <Num>{i + 1}</Num>
                <Date>{v.date}</Date>
                <Division>
                  {v.type == 'income' ? <Blue>{v.div}</Blue> : <Red>{v.div}</Red>}
                </Division>
                <What>{v.what}</What>
                <Money>₩{Number(v.income).toLocaleString()}</Money>
                <Money>₩{Number(v.spent).toLocaleString()}</Money>
                <Money>₩{total(i)}</Money>
                <Note>{v.note}</Note>
                <Proof>
                  {v.link ? <Link to={v.link}>링크</Link> : ''}
                </Proof>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableWrap>
      <Warn>
        예산 기록표 문의 <Name>2407 김승원</Name>, <Name>2404 김도윤</Name>
      </Warn>
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

const Warn = styled.div`
  margin-top: 1rem;
  text-align: center;
  font-size: 0.8rem;
  color: #aaa;
`

const Name = styled.span`
  color: #707070;
  font-weight: 500;
`