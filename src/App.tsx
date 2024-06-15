import { GraphiQL } from 'graphiql';
import type { Fetcher } from '@graphiql/toolkit';
import 'graphiql/graphiql.min.css';
import { buildSchema } from 'graphql';
import docs from './github.docs.gql'

const fetcher: Fetcher = async graphQLParams => {
  const data = await fetch(
    'https://api.github.com/graphql',
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(graphQLParams),
      credentials: 'same-origin',
    },
  );
  return data.json().catch(() => data.text());
};

const schema = buildSchema(docs.loc.source.body)
const App = () => <GraphiQL fetcher={fetcher} schema={schema} />;

export default App;
