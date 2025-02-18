import test from 'ava';
import is from '@sindresorhus/is';
import optionsToUrl from '../source/utils/options-to-url';

const origin = 'https://google.com';

test('`path` and `pathname` are mutually exclusive', t => {
	t.throws(() => {
		// @ts-ignore Error tests
		optionsToUrl({path: 'a', pathname: 'a'});
	}, 'Parameters `path` and `pathname` are mutually exclusive.');
});

test('`path` and `search` are mutually exclusive', t => {
	t.throws(() => {
		// @ts-ignore Error tests
		optionsToUrl({path: 'a', search: 'a'});
	}, 'Parameters `path` and `search` are mutually exclusive.');
});

test('`path` and `searchParams` are mutually exclusive', t => {
	t.throws(() => {
		// @ts-ignore Error tests
		optionsToUrl({path: 'a', searchParams: {}});
	}, 'Parameters `path` and `searchParams` are mutually exclusive.');
});

test('`path` option', t => {
	{
		const url = optionsToUrl({origin, path: '/x?a=1'});
		t.is(url.href, `${origin}/x?a=1`);
		t.true(is.urlInstance(url));
	}

	{
		const url = optionsToUrl({origin, path: '/foobar'});
		t.is(url.href, `${origin}/foobar`);
		t.true(is.urlInstance(url));
	}
});

test('`auth` is deprecated', t => {
	t.throws(() => {
		// @ts-ignore Error tests
		optionsToUrl({auth: ''});
	}, 'Parameter `auth` is deprecated. Use `username` / `password` instead.');
});

test('`search` and `searchParams` are mutually exclusive', t => {
	t.throws(() => {
		// @ts-ignore Error tests
		optionsToUrl({search: 'a', searchParams: {}});
	}, 'Parameters `search` and `searchParams` are mutually exclusive.');
});

test('`href` option', t => {
	const url = optionsToUrl({href: origin});
	t.is(url.href, `${origin}/`);
	t.true(is.urlInstance(url));
});

test('`origin` option', t => {
	const url = optionsToUrl({origin});
	t.is(url.href, `${origin}/`);
	t.true(is.urlInstance(url));
});

test('throws if no protocol specified', t => {
	t.throws(() => {
		optionsToUrl({});
	}, 'No URL protocol specified');
});

test('`port` option', t => {
	const url = optionsToUrl({origin, port: 8888});
	t.is(url.href, `${origin}:8888/`);
	t.true(is.urlInstance(url));
});

test('`protocol` option', t => {
	const url = optionsToUrl({origin, protocol: 'http:'});
	t.is(url.href, 'http://google.com/');
	t.true(is.urlInstance(url));
});

test('`username` option', t => {
	const url = optionsToUrl({origin, username: 'username'});
	t.is(url.href, 'https://username@google.com/');
	t.true(is.urlInstance(url));
});

test('`password` option', t => {
	const url = optionsToUrl({origin, password: 'password'});
	t.is(url.href, 'https://:password@google.com/');
	t.true(is.urlInstance(url));
});

test('`username` option combined with `password` option', t => {
	const url = optionsToUrl({origin, username: 'username', password: 'password'});
	t.is(url.href, 'https://username:password@google.com/');
	t.true(is.urlInstance(url));
});

test('`host` option', t => {
	const url = optionsToUrl({protocol: 'https:', host: 'google.com'});
	t.is(url.href, 'https://google.com/');
	t.true(is.urlInstance(url));
});

test('`hostname` option', t => {
	const url = optionsToUrl({protocol: 'https:', hostname: 'google.com'});
	t.is(url.href, 'https://google.com/');
	t.true(is.urlInstance(url));
});

test('`pathname` option', t => {
	const url = optionsToUrl({protocol: 'https:', hostname: 'google.com', pathname: '/foobar'});
	t.is(url.href, 'https://google.com/foobar');
	t.true(is.urlInstance(url));
});

test('`search` option', t => {
	const url = optionsToUrl({protocol: 'https:', hostname: 'google.com', search: '?a=1'});
	t.is(url.href, 'https://google.com/?a=1');
	t.true(is.urlInstance(url));
});

test('`hash` option', t => {
	const url = optionsToUrl({protocol: 'https:', hostname: 'google.com', hash: 'foobar'});
	t.is(url.href, 'https://google.com/#foobar');
	t.true(is.urlInstance(url));
});

test('merges provided `searchParams`', t => {
	const url = optionsToUrl({origin: 'https://google.com/?a=1', searchParams: {b: 2}});
	t.is(url.href, 'https://google.com/?a=1&b=2');
	t.true(is.urlInstance(url));
});
