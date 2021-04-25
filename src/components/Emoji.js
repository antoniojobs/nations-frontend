import React from 'react';

const Emoji = React.memo(({ symbol }) =>
    <span>
        {symbol}
    </span>)

export default Emoji
